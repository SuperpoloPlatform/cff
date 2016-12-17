REM file
set tmpfile=tmp.js

REM replace string
set oldstr=localhost/NameService
set newstr=192.168.3.26/NameService

:first
set rfile=..\server\start.js
set isfirst=1
goto Replace
:second
set rfile=..\client\logic\connet_client.js
set isfirst=0
goto Replace

REM replace server IP
:Replace
for /f "tokens=*" %%a in ('findstr /n .* %rfile%') do (
  set var=%%a
  
  setlocal enabledelayedexpansion

       

	REM be careful for following line's sequence

	set var=!var:%oldstr%=%newstr%!

	set var=!var:*:=!  

	(echo.!var!)>>%tmpfile%

  endlocal
		
  )
  
REM remove tmp file IP
if exist %tmpfile% xcopy /i/y %tmpfile% %rfile%
if exist %tmpfile% del %tmpfile%
if %isfirst%==1 (
  goto second
)
:end