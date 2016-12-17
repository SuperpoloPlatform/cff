REM cd C:\ci\job\cff\workspace\svn\trunk\installer

REM tmp file
set tmpfile=tmp.js

REM replace string
set oldstr=localhost/NameService
set newstr=192.168.2.26/NameService

REM set replace file
set rfile=..\server\start.js

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
