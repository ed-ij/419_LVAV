The Advancing Out-of-School Learning in Mathematics and Engineering (AOLME) project is an interdisciplinary effort from faculty with areas of expertise in bilingual education, mathematics education, and electrical and computer engineering.

AOLME has determined that their current manual method of analyzing video recordings of classroom interaction is very time consuming and inefficient. In order to address this inefficiency, AOLME has approved a project called “Large-scale Video Annotation and Visualization (LVAV).

The LVAV project will consist of developing a software product to automate video annotation of student engagement activities (reading, writing, talking).

-----------------SETUP-----------------

1) Install Node.js from https://nodejs.org/en/
2) ***OPTIONAL*** Install Atom for a nice code editing experience from https://atom.io/
3) Install Git from https://git-scm.com/download/win
4) Install Github Desktop from https://desktop.github.com/
5) ***Needed for OpenCV*** Install Emscripten by downloading from and following the instructions found here https://github.com/juj/emsdk
6) ***Needed for OpenCV*** Install cmake from https://cmake.org/download/
7) ***Needed for OpenCV*** Ensure you have Visual Studio Build tools installed with Windows SDK version 8.1
8) ***OPTIONAL I Think*** Install Python 3
9) ***NOT CURRENTLY REQUIRED I DON'T THINK*** Install opencv in npm using https://www.npmjs.com/package/opencv-build
10) WebRTC is an API so doesn't need to be installed

-----------------USAGE-----------------

V0.0.1  Run WebRTC/annotate.html for the annotation page.
        Functionality:  Annotation of a single video.
                        Video can be scrubbed through but not 'played'.
                        Annotation method is effective but non intuitive.
                        Annotation data cannot be exported.
                        Lots of console errors.
