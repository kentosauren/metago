import os
import shutil

# Set the directory you want to search
directory = '/path/to/directory'

# Set the file type you want to search for
file_type = '.bin'

# Set the destination folder for the files
destination = '/path/to/destination'

# Iterate through all the subdirectories and files in the directory
for root, dirs, files in os.walk(directory):
    for file in files:
        # Check if the file is of the desired file type
        if file.endswith(file_type):
            # Construct the full path to the file
            file_path = os.path.join(root, file)
            # Move the file to the destination folder
            shutil.move(file_path, destination)
