
from tkinter import *
from tkinter import filedialog, messagebox

fileName = None

def newFile():
    global fileName
    fileName = None
    text.delete(1.0, END)

def saveFile():
    global fileName
    if fileName is None:
        saveAs()
    else:
        t = text.get(1.0, END)
        with open(fileName, 'w') as f:
            f.write(t)

def saveAs():
    global fileName
    f = filedialog.asksaveasfile(mode='w', defaultextension='.txt')
    if f is None:
        return
    fileName = f.name
    t = text.get(1.0, END)
    try:
        f.write(t.rstrip())
        f.close()
    except:
        messagebox.showerror(title="ERROR", message="Unable to save file")

def openFile():
    global fileName
    f = filedialog.askopenfile(mode='r')
    if f is None:
        return
    fileName = f.name
    t = f.read()
    text.delete(1.0, END)
    text.insert(1.0, t)

root = Tk()
root.title("MY TEXT EDITOR")
root.minsize(width=400, height=400)
root.maxsize(width=400, height=440)

text = Text(root)
text.pack(expand=True, fill=BOTH)

menubar = Menu(root)
fileMenu = Menu(menubar, tearoff=0)

fileMenu.add_command(label="New", command=newFile)
fileMenu.add_command(label="Open", command=openFile)
fileMenu.add_command(label="Save", command=saveFile)
fileMenu.add_command(label="Save As...", command=saveAs)
fileMenu.add_separator()
fileMenu.add_command(label="Quit", command=root.quit)

menubar.add_cascade(label="File", menu=fileMenu)
root.config(menu=menubar)

root.mainloop()


