import os

# Set the root directory
root_dir = '/Volumes/MIYOO/Roms/PS'

# Walk through all the subdirectories in the root directory
for root, dirs, files in os.walk(root_dir):
    # Check if the current directory is empty
    if not dirs and not files:
        # Print the name of the empty directory
        print(root)
