
import BpmnJS from 'bpmn-js/lib/Modeler';


import "./index.css";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import 'bpmn-js-bpmnlint/dist/assets/css/bpmn-js-bpmnlint.css';

import lintModule from 'bpmn-js-bpmnlint';
import { Linter } from 'bpmnlint';
import bpmnlintConfig from './.bpmnlintrc';

import localData from './localstorage'

let hasChanges = false;
const linter = new Linter(bpmnlintConfig);

const beforeUnloadListener = e => {
  e.preventDefault();
  e.returnValue = 'You have unsaved changes. Are you sure you want to exit?';
  return e.returnValue;
};


let initialFile = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_1s8m89i" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="2.2.4">
  <bpmn:process id="Process_1" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="173" y="102" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`


let modeler = new BpmnJS({
  container: '#canvas',
  keyboard: {
    bindTo: document
  },
  linting:{
    bpmnlint: linter,
    active: true
  },
  additionalModules:[
    lintModule
  ]
});


const openDiagram = async (bpmnXML) => {
  try {
    if (bpmnXML) {
      await modeler.importXML(bpmnXML);
    }

    modeler.on('element.changed', () => {
      if (!hasChanges) {
        hasChanges = true;
      }
      window.addEventListener('beforeunload', beforeUnloadListener);
    });

  } catch (err) {
    console.error('could not import BPMN 2.0 diagram', err);
  }
};

const saveDiagram = async (event) => {
  var result = await modeler.saveXML();

  localData.save(undefined, result.xml, "diagram_1");
  hasChanges = false;
  window.removeEventListener('beforeunload', beforeUnloadListener);

};
document.getElementById('save-button').addEventListener('click', (event) =>
  {
    saveDiagram(event);
  })

const downloadDiagram = async () => {
  let result = await modeler.saveXML();
  const xmlText = result.xml
  let a = document.createElement('a')
  const blob = new Blob([xmlText], { type: 'text/plain' })
  a.setAttribute('href', window.URL.createObjectURL(blob))
  a.setAttribute('download', "diagram_1.bpmn")
  a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':')
  a.draggable = true
  a.classList.add('dragout')
  a.click()
};
document.getElementById('download-button').addEventListener('click', (event) =>
  {
    downloadDiagram();
  })
  


const saveFile = (e) => {

	return new Promise((resolve) => {

		const [file] = e.target.files;

		const reader = new FileReader();
		reader.addEventListener("load", () => {
			resolve(reader.result);
		}, false);

		if (file) {
			reader.readAsText(file);
		}

	})
}
document.querySelector("#bpmnfile").addEventListener("change", function (event) {
  saveFile(event)
    .then((data) => {
      console.log(data)
      localData.save(undefined, data, "diagram_1");
      location.reload();
    });

});

localData.get("diagram_1")
  .then((localFile) => {
    console.log(`local File ${localFile}`);
    if (localFile === null) {
      openDiagram(initialFile);
    } else {
      openDiagram(localFile);
    }
  });
