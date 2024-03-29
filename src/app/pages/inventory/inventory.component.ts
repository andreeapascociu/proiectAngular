import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/models/items';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

    //ngOnInit(): void {
      //throw new Error('Method not implemented.');
    //}

    itemList!: Item[];
    items: string[] = [
      'Maria',
      'Maia',
      'Ana',
      'Andrei',
      'Iulia',
      'Vasile',
      'Alexandru',
      'Ioana',
      'Valentina',
      'Gabi',
      'Alexandra',
    ];
  error?: string;

    constructor(public dialog: MatDialog, public ItemService: ItemService) { }


  ngOnInit(): void {
    this.getItems();
  }

    getItems(): void {
      this.ItemService.getItems().subscribe((list:Item[]) => {
        this.itemList = list;
      }, (err) => {
        this.error = err.error;
      })
    }

    deleteItem(id: number | undefined): void {
      this.ItemService.delete(id!).subscribe(
        () => {
          window.location.reload();
        },
        (err) => {
          this.error = err.error;
        }
      );
    }

    async openDialog(id: number | null) {

      const dialogRef = this.dialog.open(FormComponent, {
        width: '250px',
        data: {idToBeEdit: id},
      });

      dialogRef.afterClosed().subscribe(() => {
        console.log('The dialog was closed');
      });
    };

}

