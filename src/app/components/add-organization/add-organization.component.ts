import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Organization, ConfidanceColor } from 'src/app/model/organization';
import { Options } from "@angular-slider/ngx-slider";
import * as _ from "underscore";

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss']
})
export class AddOrganizationComponent implements OnInit{
  public lowConfidance: ConfidanceColor = { id: 0, min: 0, max: 100, value: 25, color: "#d30000" };
  public midConfidance:ConfidanceColor = { id: 1, min: 26, max: 100, value: 49, color: "#808080" };
  public highConfidance:ConfidanceColor = { id: 2, min: 50, max: 100, value: 89, color: "#d6c800" };
  public highestConfidance:ConfidanceColor = { id: 3, min: 90, max: 100, value: 100, color: "#80c900" };
  public options: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
    showTicks: false,
    showTicksValues: false,
    enforceStep: false,
    enforceRange: false,
    noSwitching: true,
    minRange: 1,
    pushRange: true
  };
  public manualRefresh: EventEmitter<void> = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<AddOrganizationComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Organization) { }

  ngOnInit(): void {
    this.lowConfidance = {...this.data.lowConfidance};
    this.midConfidance = {...this.data.midConfidance};
    this.highConfidance = {...this.data.highConfidance};
    this.highestConfidance = {...this.data.highestConfidance};

    /** needs to manually trigger event to update values in ng-slider in dialog */
    setTimeout(() => {
      this.manualRefresh.emit();
  }, 500);
  }

  /**
   * cancel update
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * save update
   */
  public saveOrg(){
    this.dialogRef.close(this.data);
  }

  /**
   * reset color config to initial 
   */
  public resetToInitialColorConfig() {
    this.data.lowConfidance = { ...this.lowConfidance };
    this.data.midConfidance = { ...this.midConfidance };
    this.data.highConfidance = { ...this.highConfidance };
    this.data.highestConfidance = { ...this.highestConfidance };
  }

/**
 * update color code
 * @param {Object} colorConfidanceObj 
 * @param {String} colorCode 
 */
  public changeColor(colorConfidanceObj: ConfidanceColor, colorCode: string) {
    colorConfidanceObj.color = colorCode;
  }

/**
 * update colore range for lower limit to make color range in sync
 * added debunce as slider emit event 
 */
  public valueChange = _.debounce((value:any, colorRange:string) => {
    switch (colorRange) {
      case 'highestConfidance': {
        this.data.highConfidance.value = value > 0 ? value - 1 : 0;
        if (this.data.highConfidance.min >= this.data.highConfidance.value) {
          this.data.highConfidance.min = this.data.highConfidance.value > 0 ? this.data.highConfidance.value - 1 : 0;
        }
      }
        break;
      case 'highConfidance': {
        this.data.midConfidance.value = value > 0 ? value - 1 : 0;
        if (this.data.midConfidance.min >= this.data.midConfidance.value) {
          this.data.midConfidance.min = this.data.midConfidance.value > 0 ? this.data.midConfidance.value - 1 : 0;
        }
      }
        break;
      case 'midConfidance': {
        this.data.lowConfidance.value = value > 0 ? value - 1 : 0;
        if (this.data.lowConfidance.min >= this.data.lowConfidance.value) {
          this.data.lowConfidance.min = this.data.lowConfidance.value > 0 ? this.data.lowConfidance.value - 1 : 0;
        }
      }
        break;
    }
    
  }, 1000);

  /**
   * update color range for upper limit to make color range in sync
   * added debunce as slider emit event 
   */
  public highValueChange = _.debounce((value:any, colorRange:string) => {
    switch (colorRange) {
      case 'lowConfidance': {
        this.data.midConfidance.min = value + 1;
        if (this.data.midConfidance.min >= this.data.midConfidance.value) {
          this.data.midConfidance.value = this.data.midConfidance.value < 100 ? this.data.midConfidance.min + 1 : 100;
        }
      }
        break;
      case 'midConfidance': {
        this.data.highConfidance.min = value < 100 ? value + 1 : 100;
        if (this.data.highConfidance.min >= this.data.highConfidance.value) {
          this.data.highConfidance.value = this.data.highConfidance.value < 100 ? this.data.highConfidance.min + 1 : 100;
        }
      }
        break;
      case 'highConfidance': {
        this.data.highestConfidance.min = value < 100 ? value + 1 : 100;
        if (this.data.highestConfidance.min >= this.data.highestConfidance.value) {
          this.data.highestConfidance.value = this.data.highestConfidance.value < 100 ? this.data.highestConfidance.min + 1 : 100;
        }
      }
        break;
    }
  }, 1000);

 
}
