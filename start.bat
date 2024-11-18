@echo off

REM Navigate to API directory
cd API
REM Run .NET Web API
echo Running .NET Web API...
start cmd /c dotnet watch

REM Navigate to React app directory
cd ../Client 
REM Run React app in development mode
echo Running React app...
start cmd /c npm run dev

REM Open default browser after 5 seconds
echo Opening browser in 5 seconds...
timeout /t 8 > nul
start http://localhost:3000/