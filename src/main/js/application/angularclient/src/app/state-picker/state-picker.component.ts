import { Component, OnInit, EventEmitter, ElementRef, Input, Output } from '@angular/core';

export class DropdownValue {
  value:string;
  label:string;

  constructor(value:string,label:string) {
    this.value = value;
    this.label = label;
  }
}

@Component({
  selector: 'state-picker',
  templateUrl: './state-picker.component.html',
  styleUrls: ['./state-picker.component.sass']
})
export class StatePickerComponent implements OnInit {

  constructor(private elementRef:ElementRef) {
    this.valueChange = new EventEmitter();
  }

  ngOnInit(): void {
  }

  @Input()
  values: DropdownValue[] = [
    new DropdownValue('AK','Alaska'),
    new DropdownValue('AL','Alabama'),
    new DropdownValue('AR','Arkansas'),
    new DropdownValue('AZ','Arizona'),
    new DropdownValue('CA','California'),
    new DropdownValue('CO','Colorado'),
    new DropdownValue('CT','Connecticut'),
    new DropdownValue('DC','District of Columbia'),
    new DropdownValue('DE','Delaware'),
    new DropdownValue('FL','Florida'),
    new DropdownValue('GA','Georgia'),
    new DropdownValue('HI','Hawaii'),
    new DropdownValue('IA','Iowa'),
    new DropdownValue('ID','Idaho'),
    new DropdownValue('IL','Illinois'),
    new DropdownValue('IN','Indiana'),
    new DropdownValue('KS','Kansas'),
    new DropdownValue('KY','Kentucky'),
    new DropdownValue('LA','Louisiana'),
    new DropdownValue('MA','Massachusetts'),
    new DropdownValue('MD','Maryland'),
    new DropdownValue('ME','Maine'),
    new DropdownValue('MI','Michigan'),
    new DropdownValue('MN','Minnesota'),
    new DropdownValue('MO','Missouri'),
    new DropdownValue('MS','Mississippi'),
    new DropdownValue('MT','Montana'),
    new DropdownValue('NC','North Carolina'),
    new DropdownValue('ND','North Dakota'),
    new DropdownValue('NE','Nebraska'),
    new DropdownValue('NH','New Hampshire'),
    new DropdownValue('NJ','New Jersey'),
    new DropdownValue('NM','New Mexico'),
    new DropdownValue('NV','Nevada'),
    new DropdownValue('NY','New York'),
    new DropdownValue('OH','Ohio'),
    new DropdownValue('OK','Oklahoma'),
    new DropdownValue('OR','Oregon'),
    new DropdownValue('PA','Pennsylvania'),
    new DropdownValue('PR','Puerto Rico'),
    new DropdownValue('RI','Rhode Island'),
    new DropdownValue('SC','South Carolina'),
    new DropdownValue('SD','South Dakota'),
    new DropdownValue('TN','Tennessee'),
    new DropdownValue('TX','Texas'),
    new DropdownValue('UT','Utah'),
    new DropdownValue('VA','Virginia'),
    new DropdownValue('VT','Vermont'),
    new DropdownValue('WA','Washington'),
    new DropdownValue('WI','Wisconsin'),
    new DropdownValue('WV','West Virginia'),
    new DropdownValue('WY','Wyoming')
  ];

  @Input()
  value: string[];

  @Output() 
  valueChange = new EventEmitter();

  selectItem(value) {
    console.log('value: ' + value);
    this.valueChange.emit(value);
  }

}
