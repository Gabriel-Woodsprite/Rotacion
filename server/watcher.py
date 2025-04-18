import os
import sys
import subprocess
from watchdog.observers import Observer 
from watchdog.events import FileSystemEventHandler 

class RestartHandler(FileSystemEventHandler):
    def __init__(self, script):
        self.script = script
        self.process = None
        self.start_process()

    def start_process(self):
        # Terminate the current process (if any) and start a new one
        if self.process:
            self.process.terminate()
        print(f"Starting {self.script}...")
        self.process = subprocess.Popen([sys.executable, self.script])

    def on_modified(self, event):
        # Restart the server when a Python file is modified
        if event.src_path.endswith(".py"):
            print(f"Change detected in: {event.src_path}. Restarting server...")
            self.start_process()

if __name__ == "__main__":
    script_to_watch = "index.py"  # Replace with the actual filename of your script
    event_handler = RestartHandler(script_to_watch)
    observer = Observer()
    observer.schedule(event_handler, path=os.path.dirname(os.path.abspath(script_to_watch)), recursive=False)
    observer.start()

    try:
        print(f"Watching for changes in {script_to_watch}...")
        observer.join()
    except KeyboardInterrupt:
        print("Stopping watcher...")
        observer.stop()
        if event_handler.process:
            event_handler.process.terminate()
