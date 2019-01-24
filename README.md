The Advancing Out-of-School Learning in Mathematics and Engineering (AOLME) project is an interdisciplinary effort from faculty with areas of expertise in bilingual education, mathematics education, and electrical and computer engineering.

AOLME has determined that their current manual method of analyzing video recordings of classroom interaction is very time consuming and inefficient. In order to address this inefficiency, AOLME has approved a project called “Large-scale Video Annotation and Visualization (LVAV).

The LVAV project will consist of developing a software product to automate video annotation of student engagement activities (reading, writing, talking).

-----------------SETUP V1 -----------------

1) Install Node.js from https://nodejs.org/en/ (Tested with LTS v10.15.0)
2) ***OPTIONAL*** Install Atom for a nice code editing experience from https://atom.io/
3) Install Git from https://git-scm.com/download/win
4) Install Github Desktop from https://desktop.github.com/

-----------------SETUP V2 -----------------

1) Install Node.js from https://nodejs.org/en/ (Tested with LTS v10.15.0)
2) Install Atom for a nice code editing experience from https://atom.io/
3) In Atom hit `Ctrl+Shift+P` and type `GitHub: Clone`
4) Paste https://github.com/edward-ij/419_LsVAV.git in the "clone from" box and choose where you want it on your computer.
5) Create a new file and paste the following
```
[user]
        name = <NAME>
        email = <EMAIL>
```
6) Replace the CAPITALISED bits with your actual info. Save this in your user area as .gitconfig

-----------------OPTIONAL ADDITIONAL TOOL SETUP-----------------

***OpenCV*** Install Emscripten by downloading from and following the instructions found here https://github.com/juj/emsdk
***OpenCV*** Install cmake from https://cmake.org/download/
***OpenCV*** Ensure you have Visual Studio Build tools installed with Windows SDK version 8.1
***Might be needed*** Install Python 3
***OpenCV*** Install opencv in npm using https://www.npmjs.com/package/opencv-build

-----------------USAGE-----------------

V0.0.1  Run WebRTC/annotate.html for the annotation page.
        Functionality:  Annotation of a single video.
                        Annotation method is effective but non intuitive.
                        Annotation data cannot be exported.
                        Lots of console errors.
                        Browser Support:
                        Edge: works well
                        Chrome: Video can be scrubbed through but not 'played'
