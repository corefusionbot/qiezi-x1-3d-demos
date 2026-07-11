@echo off
rem 堆芯聚变 · 离线演示包一键启动(零依赖:Windows 自带 PowerShell)
cd /d "%~dp0"
start "" http://127.0.0.1:8092/
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1" 8092
