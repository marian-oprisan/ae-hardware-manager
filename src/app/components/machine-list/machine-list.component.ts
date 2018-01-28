import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../services/machine.service';
import { Machine } from '../../models/machine';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent implements OnInit {

  machines: Machine[];

  constructor(private machineService: MachineService) { }

  ngOnInit() {
    this.machineService.getMachines().subscribe(machines => {
      this.machines = machines;
    });
  }

}
