<a name="readme-top"></a>

<div align="center">
  <a href="https://github.com/kirstenhh/teaching-bpmn">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">BPMN Teaching tool</h3>

  <p align="center">
    This project is a simple implementation of a BPMN modeler. We're using it in Moodle, as a practice tool for students. 
    <a href="https://github.com/kirstenhh/teaching-bpmn/issues">Report Bug/Request Feature</a>
  </p>
</div>

### Prerequisites
 These instructions assume you have npm and [Lumi](https://app.lumi.education/#download) installed on your machine and a running instance of Moodle with admin access.

### Installation


#### For testing:
1. Clone the repo
   ```sh
   git clone git@github.com:kirstenhh/teaching-bpmn.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
2. Run start. This serves the BPMN Modeler at localhost:8080.
  ```sh
   npm run start
   ```
3. Add h5p/LocalhostTest.h5p file in h5p to your Moodle course as an activity. 

  (todo: add screenshots here)
You now have a test instance of the modeler running on your system, and can test it either in Moodle or directly as a page.

#### For production:
1. Set the modeler up on a file or web server and give it an address. (This part will differ a great deal depending on your setup.)
2. Open h5p/BasicIframe.h5p in Lumi and change the address to where you're serving the modeler.
3. Add it to your Moodle course as an activity.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

[Kirsten Hauck](https://www.linkedin.com/in/kirsten-hauck-469b31152/) - kirsten.hauck@processcentric.ch

Project Link: [https://github.com/github_username/repo_name](https://github.com/github_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
