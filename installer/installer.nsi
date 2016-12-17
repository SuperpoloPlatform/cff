; 
;  This file is part of the UGE(Uniform Game Engine).
;  Copyright (C) by SanPolo Co.Ltd. 
;  All rights reserved.
;
;  See http://uge.spolo.org/ for more information.
;
;  SanPolo Co.Ltd
;  http://uge.spolo.org/  sales@spolo.org uge-support@spolo.org
;

;--------------------------------
;Include Modern UI

  !include "MUI2.nsh"

;--------------------------------
;General

  ;Name and file
  Name "Call From Future"
  OutFile "cff_installer.exe"

  ;Default installation folder
  InstallDir "$PROGRAMFILES\Call From Future"
  
  ;Get installation folder from registry if available
  InstallDirRegKey HKCU "Software\Call From Future" ""

  ;Request application privileges for Windows Vista
  RequestExecutionLevel user

;--------------------------------
;Variables

  Var StartMenuFolder

;--------------------------------
;Interface Settings

  !define MUI_ABORTWARNING

;--------------------------------
;Pages

  !insertmacro MUI_PAGE_LICENSE "${NSISDIR}\Docs\Modern UI\License.txt"
  !insertmacro MUI_PAGE_COMPONENTS
  !insertmacro MUI_PAGE_DIRECTORY
  
  ;Start Menu Folder Page Configuration
  !define MUI_STARTMENUPAGE_REGISTRY_ROOT "HKCU" 
  !define MUI_STARTMENUPAGE_REGISTRY_KEY "Software\Call From Future" 
  !define MUI_STARTMENUPAGE_REGISTRY_VALUENAME "Start Menu Folder"
  
  !insertmacro MUI_PAGE_STARTMENU Application $StartMenuFolder
  
  !insertmacro MUI_PAGE_INSTFILES
  
  !insertmacro MUI_UNPAGE_CONFIRM
  !insertmacro MUI_UNPAGE_INSTFILES

;--------------------------------
;Languages
 
  !insertmacro MUI_LANGUAGE "English"

;--------------------------------
;Installer Sections

Section "SPP Core" SecSpp
  
  ; Copy files to install dir
  SetOutPath "$INSTDIR"
  File /r C:\spp_sdk\plugins
  File /r C:\spp_sdk\data
  File C:\spp_sdk\spp.exe
  File C:\spp_sdk\libz-cs.dll
  File C:\spp_sdk\v8.dll
  File C:\ci\job\cff\workspace\svn\trunk\installer\run.bat
  
  ;SetOutPath "$INSTDIR\plugins\ext"
  ;File /r C:\source\depends\omniORB-4.1.6\bin\x86_win32\omniDynamic416_vc9_rt.dll
  ;File /r C:\source\depends\omniORB-4.1.6\bin\x86_win32\omniORB416_vc9_rt.dll 
  ;File /r C:\source\depends\omniORB-4.1.6\bin\x86_win32\omnisslTP416_vc9_rt.dll
  ;File /r C:\source\depends\omniORB-4.1.6\bin\x86_win32\omnithread34_vc9_rt.dll
  ;File /r C:\source\depends\openssl-1.0.1c\out32dll\libeay32.dll
  ;File /r C:\source\depends\openssl-1.0.1c\out32dll\ssleay32.dll
  ;Store installation folder
  WriteRegStr HKCU "Software\Call From Future" "" $INSTDIR
  
  ;Create uninstaller
  WriteUninstaller "$INSTDIR\Uninstall.exe"
  
  !insertmacro MUI_STARTMENU_WRITE_BEGIN Application
    
    ;Create shortcuts
    CreateDirectory "$SMPROGRAMS\$StartMenuFolder"
	CreateShortCut "$SMPROGRAMS\$StartMenuFolder\Call From Future.lnk" "$INSTDIR\run.bat"
    CreateShortCut "$SMPROGRAMS\$StartMenuFolder\Uninstall.lnk" "$INSTDIR\Uninstall.exe"
	CreateShortCut "$DESKTOP\Call From Future.lnk" "$INSTDIR\run.bat"
  
  !insertmacro MUI_STARTMENU_WRITE_END

SectionEnd

Section "CFF game data" SecCff
  
  ; Copy files to install dir
  SetOutPath "$INSTDIR\game"
  File /r ..\client\art
  File /r ..\client\certificate
  File /r ..\client\logic
  File /r ..\client\ui
  File    ..\client\cff.log
  File    ..\client\globalvar.js
  File    ..\client\connect_net.js
  File    ..\client\start.js
  
SectionEnd

;--------------------------------
;Descriptions

  ;Language strings
  LangString DESC_SecSpp ${LANG_ENGLISH} "SPP Core."
  LangString DESC_SecCff ${LANG_ENGLISH} "Call From Future game data."

  ;Assign language strings to sections
  !insertmacro MUI_FUNCTION_DESCRIPTION_BEGIN
    !insertmacro MUI_DESCRIPTION_TEXT ${SecSpp} $(DESC_SecSpp)
    !insertmacro MUI_DESCRIPTION_TEXT ${SecCff} $(DESC_SecCff)
  !insertmacro MUI_FUNCTION_DESCRIPTION_END
 
;--------------------------------
;Uninstaller Section

Section "Uninstall"

  ;ADD YOUR OWN FILES HERE...

  Delete "$INSTDIR\Uninstall.exe"

  RMDir "$INSTDIR"
  
  !insertmacro MUI_STARTMENU_GETFOLDER Application $StartMenuFolder
    
  Delete "$SMPROGRAMS\$StartMenuFolder\Uninstall.lnk"
  Delete "$DESKTOP\Call From Future.lnk"
  RMDir "$SMPROGRAMS\$StartMenuFolder"
  
  DeleteRegKey /ifempty HKCU "Software\Call From Future"

SectionEnd