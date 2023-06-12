import { SpreadsheetComponent, SheetsDirective, SheetDirective, ColumnsDirective, RangesDirective, RangeDirective, RowsDirective, RowDirective, CellsDirective, CellDirective, ColumnDirective } from '@syncfusion/ej2-react-spreadsheet';
import { useEffect, useRef,useState } from 'react';
import { useAddNewLedgerItemMutation } from './ledgerApiSlice';


const LedgerSpreadsheet = ({rows}) => {

    const [rowData, setRowData] = useState(rows) || []
    const [json, setJson] = useState([]) || []
    const spreadsheetRef = useRef(null);

    const [addNewItem, {
        isLoading,
        isSuccess,
        isError,
        error
      }] = useAddNewLedgerItemMutation()

    useEffect(()=>{
        let spreadsheet = spreadsheetRef.current;
          
        if (spreadsheet) {
    
          //spreadsheet.insertRow(rows.length, rows);
          spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:D1');
            
        }
    },[])

    const onSaveNewItem= async(e) =>{
        e.preventDefault()
        if(canSave){
              
          await addNewItem({name, lastname, idnumber,adress, email, phone, avatar, username, password, roles})
          handleClose()
            }
      
      }
    
   const saveItem = async() =>{
    let spreadsheet = spreadsheetRef.current;
    let jsonObj = await spreadsheet.saveAsJson().then(resp=>{return resp.jsonObject.Workbook.sheets[0].rows})
  
    const rows = jsonObj.map(row=>{return {
        date:row.cells[0].value,
        description:row.cells[1].value,
        expenses:row.cells[2].value,
        income:row.cells[3].value
}
    })
    console.log(rows)
   }     

  return (
    <div className="spreadsheet_container">
        <button onClick={saveItem}>Save</button>
        <SpreadsheetComponent ref={spreadsheetRef} showSheetTabs={true} showRibbon={false} showFormulaBar={false}>
               <SheetsDirective >
                   <SheetDirective >
                       <RangesDirective >
                            <RangeDirective  dataSource={rowData} ></RangeDirective>
                        </RangesDirective>
                        <RowsDirective >
                            <CellsDirective>
                                <CellDirective></CellDirective>
                                <CellDirective></CellDirective>
                                <CellDirective></CellDirective>
                                <CellDirective></CellDirective>
                            </CellsDirective>
                        </RowsDirective>
                        <ColumnsDirective>
                        <ColumnDirective width={100}></ColumnDirective>
                        <ColumnDirective width={500}></ColumnDirective>
                        <ColumnDirective width={100}></ColumnDirective>
                        <ColumnDirective width={180}></ColumnDirective>
                        </ColumnsDirective>
                    </SheetDirective>
                </SheetsDirective>
           </SpreadsheetComponent>      
        </div>
  )
}

export default LedgerSpreadsheet