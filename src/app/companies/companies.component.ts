import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ExportService} from '../services/export.service';

import * as FileSaver from 'file-saver';
import * as xlsx from 'xlsx';
import {Table2SheetOpts} from 'xlsx';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  @ViewChild('epltable', {static: false}) epltable: ElementRef;
  companies = [
    {
      nome: 'Sérgio e Leonardo Ferragens ME',
      cnpj: '29515112000167',
      abertura: '21/08/2016',
      site: 'www.sergioeleonardoferragensme.com.br',
      cep: '07251190'
    },
    {
      nome: 'Teresinha e Louise Vidros ME',
      cnpj: '55374516000198',
      abertura: '02/08/2016',
      site: 'www.teresinhaelouisevidrosme.com.br',
      cep: '05387135'
    }
  ];

  constructor(private exportService: ExportService) {
  }

  ngOnInit(): void {
  }

  exportToExcel(): void {
    // this.exportService.exportExcel(
    //   // this.companies,
    //   this.epltable.nativeElement,
    //   'companies');
    const config: Table2SheetOpts = {
      raw: true,
      cellDates: false,
      cellStyles: false
    };
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement, config);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Empresas');
    xlsx.writeFile(wb, 'empresas.xlsx');
  }

}
