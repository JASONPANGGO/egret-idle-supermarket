::Egret一键打包工具
::version_1.0
@echo off&setlocal EnableDelayedExpansion
::获取文件夹名称
cd ..\..\
set lj=%cd%
set lj=%lj:\= %
for %%a in (%lj%) do set pack_name=%%a
cd release
cd bin-release
cd web
set release_path=%cd%
::修改文件“1”为对应项目文件夹名称
rd /q /s %pack_name%
rename 1 %pack_name%
cd %pack_name%
rename index.html %pack_name%.html

cd ..\
::删除原压缩包，创建压缩包
del %pack_name%.zip
::"C:\Program Files\Bandizip\Bandizip.exe" a "%pack_name%.zip" "%pack_name%"
rar a -r -ep1 "%pack_name%.zip" "%pack_name%"
::把压缩包复制到根目录下