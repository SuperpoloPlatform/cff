cd C:\ci\job\cff\workspace\svn\trunk\installer

REM tmp file
set tmpfile=tmp.js

REM replace string
set oldstr=localhost/NameService
set newstr=192.168.2.26/NameService


REM set replace file
set rfile=..\client\connect_net.js


REM replace
for /f "tokens=*" %%a in ('findstr /n .* %rfile%') do (
  set var=%%a
  
  setlocal enabledelayedexpansion

       

	REM be careful for following line's sequence

	set var=!var:%oldstr%=%newstr%!

	set var=!var:*:=!  

	(echo.!var!)>>%tmpfile%

  endlocal
		
  )
  
REM remove tmp file
if exist %tmpfile% xcopy /i/y %tmpfile% %rfile%
if exist %tmpfile% del %tmpfile%


REM delete provious file
del *.exe

REM package client
"c:\Program Files\NSIS\makensis.exe" installer.nsi

REM publish product
@echo [D] rename installer
copy /y "cff_installer.exe" cff_installer.%BUILDDATE%.exe