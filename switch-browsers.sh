#!/bin/bash

# Define constants for file names
FILE_FIREFOX="manifest.firefox.json"
FILE_CHROME="manifest.chrome.json"
FILE_MANIFEST="manifest.json"

# Check for the files
if [[ -e "$FILE_FIREFOX" && -e "$FILE_CHROME" ]]; then
    echo "Both $FILE_FIREFOX and $FILE_CHROME are present."
else
    if [[ ! -e "$FILE_MANIFEST" ]]; then
        echo "$FILE_MANIFEST is missing."
    fi
    if [[ ! -e "$FILE_FIREFOX" ]]; then
        # Firefox active
        mv $FILE_MANIFEST $FILE_FIREFOX
        mv $FILE_CHROME $FILE_MANIFEST
    fi
    if [[ ! -e "$FILE_CHROME" ]]; then
        # Chrome active
        mv $FILE_MANIFEST $FILE_CHROME
        mv $FILE_FIREFOX $FILE_MANIFEST
    fi
fi