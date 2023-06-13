# This is a script that recursively goes through a directory and
# converts all the JavaScript scripts to one line and wraps them
# for bookmarklets use. Will also remove the comments.

# Imports
from os import path
import re
from pathlib import Path
from dataclasses import dataclass

# Get all the files in the directory
def get_files(directory: str) -> list:
    return list(Path(directory).rglob("*.[jJ][sS]"));

# Read the file and return the contents
def read_file(file: str) -> str:
    with open(file, "r") as f:
        return f.read()

# Remove the comments from the file
def remove_comments(content: str) -> str:
    return re.sub(r"\/\*.*\*\/", "", content, flags=re.MULTILINE)

# Remove the newlines from the file
def remove_newlines(content: str) -> str:
    return re.sub(r"(\r\n|\n)", "", content)

# Remove the tabs and spaces from the file
def remove_tabs(content: str) -> str:
    return re.sub(r"\s{2}", "", content)

# Wrap the file in a function
def wrap_file(content: str) -> str:
    return "javascript:(()=>{" + content + "})();"

# Dataclass to hold the file name and the contents
@dataclass
class ScriptContent:
    script_name: str
    contents: str

# Main function
def main():
    # The main directory is the one that contains the script
    main_directory = path.dirname(path.realpath(__file__))

    # Get the files in the directory
    files = get_files(main_directory)

    # List to hold the ScriptContent
    script_contents = []

    # Loop through the files
    for file in files:
        # Read the file
        contents = read_file(file)

        # Remove the comments
        contents = remove_comments(contents)

        # Remove the newlines
        contents = remove_newlines(contents)

        # Remove the tabs and spaces
        contents = remove_tabs(contents)

        # Wrap the file
        contents = wrap_file(contents)

        # Write the file
        script_contents.append(ScriptContent(file.stem, contents))

    # Loop through the script contents and write them to a single file
    with open("bookmarklets.txt", "a") as f:
        f.write("Bookmarklets:\n")
        f.write("\n")
        for script_content in script_contents:
            f.write(script_content.script_name + "\n")
            f.write(script_content.contents + "\n")
            f.write("\n")

# Run the main function
if __name__ == "__main__":
    main()