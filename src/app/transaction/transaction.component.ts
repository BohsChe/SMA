import { Component, OnInit } from "@angular/core";
import { HttpRequestServiceService } from "../services/http-request-service.service";
import { MatDialog } from "@angular/material";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styles: []
})
export class TransactionComponent implements OnInit {
  constructor(
    httpRequestService: HttpRequestServiceService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}
}
