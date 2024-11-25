#!/bin/bash

# Define constants for file names
FILE_FIREFOX="manifest.firefox.json"
FILE_CHROME="manifest.chrome.json"
FILE_MANIFEST="manifest.json"

if [[ -e "$FILE_FIREFOX" && -e "$FILE_CHROME" ]]; then
    echo "Both $FILE_FIREFOX and $FILE_CHROME are present."
else
    if [[ ! -e "$FILE_MANIFEST" ]]; then
        echo "$FILE_MANIFEST is missing."
    elif [[ ! -e "$FILE_FIREFOX" ]]; then
        # Firefox active
        echo "Switch to $FILE_CHROME"
        mv $FILE_MANIFEST $FILE_FIREFOX
        mv $FILE_CHROME $FILE_MANIFEST
    elif [[ ! -e "$FILE_CHROME" ]]; then
        # Chrome active
        echo "Switch to $FILE_FIREFOX"
        mv $FILE_MANIFEST $FILE_CHROME
        mv $FILE_FIREFOX $FILE_MANIFEST
    fi
fi