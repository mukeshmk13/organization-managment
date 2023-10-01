import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Organization } from 'src/app/model/organization';
import { OrganizationService } from 'src/app/services/organization.service';
import { AddOrganizationComponent } from '../add-organization/add-organization.component';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {
  private AllorganisationData: Organization[] = [];
  public filterText: string = '';
  public dataSource: any = [];
  public columns: string[] = ['orgId', 'organisationName', 'telephone', 'validFrom', 'validTo', 'eulaStatus', 'actions'];

  constructor(private orgService: OrganizationService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.loadOrganisationData();
  }

  /**
   * load organization data list
   */
  private loadOrganisationData() {
    this.orgService.getOrganizationsList().subscribe(resp => {
      this.AllorganisationData = resp;
      this.createOrganigationData();
    })
  }

  /**
   * show filtered organization data
   */
  public createOrganigationData() {
    if (this.filterText) {
      this.dataSource = this.AllorganisationData.filter(
        (d) => (d.organisationName && d.organisationName.toLocaleLowerCase().includes(this.filterText.toLocaleLowerCase())) || (d.telephone && d.telephone.includes(this.filterText)) || (d.email && d.email.includes(this.filterText))

      );
    } else {
      this.dataSource = [...this.AllorganisationData];
    }
  }


  /**
   * add or update organization
   * @param {Object} orgObj
   */
  public openOrganizationDialog(orgObj?: Organization) {
    const dialogRef = this.dialog.open(AddOrganizationComponent, {
      panelClass: "tn-close-dialog",
      height:'90%',
      data: orgObj || {
        lowConfidance: { id: 0, min: 0, max: 100, value: 25, color: "#d30000" },
        midConfidance: { id: 1, min: 26, max: 100, value: 49, color: "#808080" },
        highConfidance: { id: 2, min: 50, max: 100, value: 89, color: "#d6c800" },
        highestConfidance: { id: 3, min: 90, max: 100, value: 100, color: "#80c900" }
      }
    });

    dialogRef.afterClosed().subscribe(
      (orgObj: Organization) => {
        if (orgObj) {
          const itemIndex = this.AllorganisationData.findIndex(o => o.orgId === orgObj.orgId);
          if (itemIndex > -1) {
            this.AllorganisationData[itemIndex] = orgObj;
          } else {
            this.AllorganisationData.push(orgObj);
          }

          this.createOrganigationData();
        }
      }
    );
  }

  /**
   * remove organization from list
   * @param {Number} id 
   */
  public deleteOrg(id: string) {
    this.AllorganisationData = this.AllorganisationData.filter(orgObj => orgObj.orgId !== id);
    this.createOrganigationData();
  }

}
