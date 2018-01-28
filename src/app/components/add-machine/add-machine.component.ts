import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../services/machine.service';
import { Machine } from '../../models/machine';

@Component({
  selector: 'app-add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.css']
})
export class AddMachineComponent implements OnInit {

  machine: Machine;

  constructor(private machineService: MachineService) { }

  ngOnInit() {
    this.machine = {
      id: '',
      make: '',
      model: '',
      drumunit: '',
      developerunit: '',
      wtc: '',
      fuserunit: '',
      itb: '',
      itbcleaner: '',
      transferrollerptb: '',
      feedrollerstray: '',
      separationrollertray: '',
      feedrollersbypass: '',
      adfpickup: '',
      adfreversefriction: '',
      lsu: '',
      platen: '',
      pbamain: '',
      opepba: '',
      smps: '',
      hvps: '',
      ope: '',
      hdd: '',
      observations: ''
    };
  }

  addMachine () {
    if (this.machine.model !== '' || this.machine.observations !== '') {
      this.machineService.addMachine(this.machine);
      this.machine.model = '';
      this.machine.drumunit = '';
      this.machine.developerunit = '';
      this.machine.wtc = '';
      this.machine.fuserunit = '';
      this.machine.itb = '';
      this.machine.itbcleaner = '';
      this.machine.transferrollerptb = '';
      this.machine.feedrollerstray = '';
      this.machine.separationrollertray = '';
      this.machine.feedrollersbypass = '';
      this.machine.adfpickup = '';
      this.machine.adfreversefriction = '';
      this.machine.lsu = '';
      this.machine.platen = '';
      this.machine.pbamain = '';
      this.machine.opepba = '';
      this.machine.smps = '';
      this.machine.hvps = '';
      this.machine.ope = '';
      this.machine.hdd = '';
      this.machine.observations = '';
    }
  }
}
