# CoreFusion offline demo static server (zero-dependency: built-in Windows PowerShell/.NET).
# Usage: double-click start-demo.bat, or: powershell -ExecutionPolicy Bypass -File serve.ps1 [port]
# Note: pages use ES modules + GLB loading; opening the HTML via file:// is blocked by
# browser CORS rules, so a local http server is required. Chinese docs: see README.md.
# (ASCII-only on purpose: PowerShell 5.1 misreads BOM-less UTF-8 scripts as ANSI.)
param([int]$Port = 8092)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$mime = @{
  '.html'='text/html; charset=utf-8'; '.js'='text/javascript; charset=utf-8'
  '.mjs'='text/javascript; charset=utf-8'; '.css'='text/css; charset=utf-8'
  '.json'='application/json; charset=utf-8'; '.glb'='model/gltf-binary'
  '.wasm'='application/wasm'; '.png'='image/png'; '.jpg'='image/jpeg'
  '.svg'='image/svg+xml'; '.ico'='image/x-icon'; '.md'='text/plain; charset=utf-8'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
$listener.Prefixes.Add("http://localhost:$Port/")
try { $listener.Start() } catch {
  Write-Host ("Port {0} unavailable ({1}). Try another: powershell -File serve.ps1 8093" -f $Port, $_.Exception.Message) -ForegroundColor Red
  exit 1
}
Write-Host ""
Write-Host "  CoreFusion offline demo running (Ctrl+C to stop)" -ForegroundColor Green
Write-Host "  18-servo face console: http://127.0.0.1:$Port/servo18-console.html"
Write-Host "  Dual-arm 8ch console:  http://127.0.0.1:$Port/arm-console.html"
Write-Host ""

while ($listener.IsListening) {
  try { $ctx = $listener.GetContext() } catch { break }
  $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
  if ($rel -eq '') { $rel = 'index.html' }
  $path = Join-Path $root ($rel -replace '/', '\')
  # Path traversal guard: resolved path must stay inside the package directory
  $full = [IO.Path]::GetFullPath($path)
  if (-not $full.StartsWith($root, [StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path -LiteralPath $full -PathType Leaf)) {
    $ctx.Response.StatusCode = 404
    $body = [Text.Encoding]::UTF8.GetBytes('404 Not Found')
    $ctx.Response.OutputStream.Write($body, 0, $body.Length); $ctx.Response.Close(); continue
  }
  $ext = [IO.Path]::GetExtension($full).ToLower()
  $ctx.Response.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
  $bytes = [IO.File]::ReadAllBytes($full)
  $ctx.Response.ContentLength64 = $bytes.Length
  try { $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length) } catch {}
  $ctx.Response.Close()
}
