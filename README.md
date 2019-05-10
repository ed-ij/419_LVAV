# Large-scale Video Annotation and Visualization (LVAV)

This project was commissioned to fulfill a need for an open accessible platform for flexible & manual annotation of large quantities of video footage. The specific use case being designed for is video deep learning but we are aware that there are potentially far more applications.

The main objectives of the active LVAV project currently consist of developing a web app to speed up video annotation of student engagement activities (reading, writing, talking).

This project was initiated and sponsored by the [Advancing Out-of-School Learning in Mathematics and Engineering (AOLME) project](https://aolme.unm.edu/).

A demo site is under construction and will be available [here](https://edij.co.uk/testArea/annotationPage.html) soon!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

1) Get a text editor, we recommend using [Atom](https://atom.io/) for a nice code editing experience from
2) Install a Git revision control system, we like [GitHub Desktop](https://desktop.github.com/) for it's full GitHub compatibility and ease of use
3) A modern browser for testing (Chrome 72 recommended, go to chrome://settings/help on chrome to find out the version you are using)
4) Your own Firebase project, these can be setup by following the instructions  on the [Firebase Website](https://firebase.google.com/). All you require is a google account and you can use the "Spark Plan" for free (with some limitations).
5) Some features have to be tested remotely as for security reasons they cannot be tested locally, if think you may need to do this check out the "Setup for Testing Server Functionality" section

### Installing

Clone the git repository

```
https://github.com/edward-ij/419_LVAV.git
```

Setup a `.gitconfig` file by replacing the capitalized sections and placing it in your main user area

```
[user]
        name = <NAME>
        email = <EMAIL>
```

The `.gitignore` file should be inside the repository and look something like this:

```
#these files will not be synchronized between users for security reasons

*/app_config.js

#this ensures files that contain sensitive info do not end up on GitHub
```

Make a copy of the `app_config_template.js` file and rename it `app_config.js`.
Fill out the relevant data about your Firebase project, server address etc.

For example if our videos were being stored here: `https://examplemediaserver.com/myarea/videos/` you would change part of the config file to

```
...
// this is the root directory for the file structure you want to get videos from
var annotationServer = "https://examplemediaserver.com/myarea/videos/`";
// the below is generally the same as above but has been setup to allow different structures
// if you need to browse the files in a separate file structure for any reason
var fileTreeServer = annotationServer;

var config = {
    // this data can be copied and pasted from the firebase console
    // first select "Add app" from just below the project name
    // then selecting the web app icon
    // give your app a nickname and copy the config data across
    apiKey: "jhbaQODGHHWbwk",
    authDomain: "example.firebaseapp.com",
    ...
};
```

Set the firebase Authentication to allow anonymous sign in (there is a toggle switch in the Firebase console), then setup the Firebase Database Rules as follows:

```
{
  /* Visit https://firebase.google.com/docs/database/security to learn more about security rules. */
  "rules": {
      /* This setup allows any signed in user to access the entire database*/
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```
Upload the files onto a webserver in their current structure apart from `jqueryFileTree.php` which needs to be placed on the server where the videos are being stored in order for the file tree to work.

If you want to just run the system locally you currently will have to manually change the video path in the annotationPage.html file, there is a commented out alternative prototype that can be used. This is the only thing that you *should* have to change for it to run locally.

### Deployment

See Installation section as this system does not require compilation

## Exporting the annotation data

You have a few options for exporting data:
* The built in functionality to export the data for an individual video in the GUI
* Write and run a script to get the specific data you want directly from the firebase database using an API (Python, Javascript or C++)
* Export the entire database directly to a JSON from the "Realtime Database" section of the Firebase console

## Built With

* [Firebase](https://firebase.google.com/) - The database platform and API used
* [jQuery File Tree](https://www.abeautifulsite.net/jquery-file-tree) - Used to generate the server file tree
* [jQuery](https://jquery.com/) - Required for the above file tree plugin

## Contributing

Please branch or fork this repository with credit rather than making contributions as this is mostly no longer under development

## Team

* **Miguel Lujan** - *Software engineer & project manager with a focus on the user interface* - [GitHub](https://github.com/2Gunz)
* **Edward Ireland-Jones** - *Software engineer with focus on Firebase integration* - [Website](https://edij.co.uk)
* **Rachel Fulcher** - *Machine learning test engineer* -
* **Sara Walton** - *Machine learning & ground truth engineer*

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details)

### Acknowledgments

* **Abby Jacoby and Alexander Kaberlein** - *Created the original codebase which this project was built on* - [GitHub Project](https://github.com/cannoness/ECE419420)
