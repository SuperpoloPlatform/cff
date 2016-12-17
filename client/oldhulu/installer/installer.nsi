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
  OutFile "CFF Installer.exe"

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
  File /r C:\ci\job\spp\workspace\spp\trunk\out\release\plugins
  File /r C:\ci\job\spp\workspace\spp\trunk\out\release\data
  File C:\ci\job\spp\workspace\spp\trunk\out\release\spp.exe
  File C:\source\depends\CrystalSpaceLibs\dlls\libz-cs.dll
  File C:\source\depends\v8\v8.dll
  File C:\ci\job\cff\workspace\svn\trunk\installer\run.bat
  
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
  File /r ..\art
  File /r ..\lightmaps
  File /r ..\objlayout
  File /r ..\ui
  File ..\*.js
  File ..\*.xml
  File ..\lightmaps.cslib
  
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