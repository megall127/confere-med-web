import React, { useEffect, useState } from "react";
import * as S from "./styled";
import logo from "../../assets/img/logo.png";
import { RadioButton } from 'primereact/radiobutton';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { PuffLoader } from "react-spinners";
import api from "../../service/api";
import toast, { Toaster } from 'react-hot-toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Modal from 'react-modal';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Dropdown } from 'primereact/dropdown';



const AllDoctors = () => {
    const [allDocs, setallDocs] = useState()
    const [totalValue, setTotalValue] = useState(0)
    const [loading, setLoading] = useState(false);
    const [obgSelect, setObjSelect] = useState({})  
    const [obgSelectProc, setObjSelectProc] = useState({})  
    const [modalProc, setModalProc] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [docSelect, setDocSelect] = useState({proc:[]})
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionPay, setSelectedOptionPay] = useState(null);

    const [objClinic, setObjClinic] = useState({
        name: '',
        local: ''
    })
    
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

      let data = {
        id: obgSelectProc[0]?.id,
        newStats: selectedOption?.code,
        newPayment: selectedOptionPay?.code
      }

      const options = [
        { name: 'Agendado', code: 1 },
        { name: 'Executado', code: 2 },
        { name: 'Cancelado', code: 3 },
    ];

      const optionsPay = [
        { name: 'Aguardando', code: 1 },
        { name: 'Pago', code: 2 },
        { name: 'Atrasado', code: 3 },
    ];



    const notifySucess = () => toast.success('Clínica cadastrado com sucesso.');

    const notifyErro = () => toast.error('Informações incorretas, verifique e tente novamente.');

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    const handleAllDocs = () => {
        api.get("/getalldoctors")
        .then((res) => {
            setallDocs(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleInfosDoc = (id) => {
        api.post('/takedoctors', {id: id})
        .then((res) => {
            setDocSelect(res.data.data)
            console.log(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleEditProc = () => {
        setLoading(true)
        api.post('/procedit', data)
        .then((res) => {
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
        })
    }

    const onOptionsChange = (e) => {
        setSelectedOption(e.value);
    }

    const onOptionsChangePay = (e) => {
        console.log(e.value)
        setSelectedOptionPay(e.value);
    }



    useEffect(() => {
        handleAllDocs()
       
    },[])

    useEffect(() => {
        console.log(docSelect)
    }, [docSelect])

    useEffect(() => {
        handleInfosDoc(obgSelect[0]?.id)
    },[obgSelect])

    
    useEffect(() => {
        handleEditProc()
        setLoading(true)
    },[selectedOption, selectedOptionPay])



    
    const actionTemplateEdit = (products, column) => {
        return <div>
            <S.ButtonEdit onClick={() => setModalEdit(true)}>Editar</S.ButtonEdit>
        </div>;
    }

    const actionTemplateShow = (products, column) => {
        return <div>
            <S.ButtonEdit onClick={() => setModalProc(true)}>Visualizar Procedimentos</S.ButtonEdit>
        </div>;

    }


    const checkRowData = (rowData) => {
        if(rowData === 1){
            return 'Agendado'
        } else if(rowData === 2){
            return 'Executado'
        } else {
            return 'Cancelado'
        }
    }

    const checkRowDataPay = (rowData) => {
        if(rowData === 1){
            return 'Aguardando'
        } else if(rowData === 2){
            return 'Pago'
        } else {
            return 'Atrasado'
        }
    }

    const actionTemplateStats = (rowData) => {  
       if(rowData?.stats_proc === 2){
        return(
            <div>
            <Dropdown color="blue" value={selectedOptionPay} options={optionsPay} onChange={onOptionsChangePay} optionLabel="name"  placeholder={checkRowDataPay(rowData.stats_pay)} />
             </div>
            )
       } else {
            if(selectedOption?.code === 2){
                return(
                <div>
                <Dropdown color="blue" value={selectedOptionPay} options={optionsPay} onChange={onOptionsChangePay} optionLabel="name" style={{color: "red"}}  placeholder={checkRowDataPay(rowData.stats_pay)} />
                 </div>
                )
            }else {
         return(
            <div>
            <Dropdown color="blue" value={selectedOption} options={options} onChange={onOptionsChange} optionLabel="name" placeholder={checkRowData(rowData.stats_proc)} />
            </div>
        )
            }
        // return console.log(rowData.stats_proc)
    }
}

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }

    const formatCurrencyDate = (date) => {
        const newDate = new Date(date);
        const day = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();

        return `${day}/${month}/${year}`
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.valor_proc);
    }

    const DataBodyTemplate = (rowData) => {
        return formatCurrencyDate(rowData.date_proc);
    }

    function closeModal() {
        setModalProc(false);
      }

    function closeModalEdit() {
        setModalEdit(false);
      }

      const thisMonthTotal = () => {
        let total = 0;
        for(let value of docSelect.proc) {
            total += value.valor_proc;
        }

        return formatCurrency(total);
    }

      const left15DaysTotal = () => {
        const today = new Date()
        const day = 86400000
        const daysAgo = new Date(today - (15*day))
        const leftDaysAgo = docSelect.proc.filter(element => element.date_proc <= today.toISOString().slice(0, 10) && element.date_proc >= daysAgo.toISOString().slice(0,10) )


        let total = 0;
        for(let value of leftDaysAgo) {
            total += value.valor_proc;
        }
        return formatCurrency(total);
    }

    const next15DaysTotal = () => {
        const today = new Date()
        const DaysInTheFuture = new Date(new Date().setDate(new Date().getDate() + 15));
        const leftDaysAgo = docSelect.proc.filter(element => element.date_proc >= today.toISOString().slice(0, 10) && element.date_proc <= DaysInTheFuture.toISOString().slice(0,10) )



        let total = 0;
        for(let value of leftDaysAgo) {
            total += value.valor_proc;
        }
        return formatCurrency(total);
    }

    const next30DaysTotal = () => {
        const today = new Date()
        const DaysInTheFuture = new Date(new Date().setDate(new Date().getDate() + 30));
        const leftDaysAgo = docSelect.proc.filter(element => element.date_proc >= today.toISOString().slice(0, 10) && element.date_proc <= DaysInTheFuture.toISOString().slice(0,10) )

        let total = 0;
        for(let value of leftDaysAgo) {
            total += value.valor_proc;
        }
        return formatCurrency(total);
    }

    let footerGroup = <ColumnGroup>
      <Row>
          <Column footer="Total"/>
          <Column footer={thisMonthTotal}/>

          <Column footer="Ultimos 15 dias"  />
          <Column footer={left15DaysTotal} />
          </Row>
          <Row>
        
          <Column footer="Proximos 15 dias"/>
          <Column footer={next15DaysTotal} />

          <Column footer="Proximos 30 dias"  />
          <Column footer={next30DaysTotal}  />
      </Row>
      </ColumnGroup>;



    const checkPay = () => {
        if(selectedOption === 2){
            return 'stats_pay'
        } else {
            return 'stats_proc'
        }
    }

    return(
        <S.Body>
             <Toaster/>
             <Modal
                isOpen={modalProc}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                {/* {Procedimentos} */}
                <S.ModalBody>
                <S.RowColum>
                    <DataTable style={{ width: 1000}} footerColumnGroup={footerGroup} value={docSelect.proc} paginator responsiveLayout="scroll"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,30,50]}
                     selectionMode="checkbox" dataKey="numrDfq" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}  selectionKeys={obgSelectProc} onSelectionChange={e => setObjSelectProc(e.value)}>
                    <Column field="nome_paciente" header="Nome do Paciente"></Column>
                    <Column field="nome_proc" header="Procedimento" ></Column>
                    <Column field="convenio" header="Convenio" ></Column>
                    <Column field="clinica" header="Clinica" ></Column>
                    <Column field={checkPay} header="Status" body={actionTemplateStats}></Column>
                    <Column field="date_proc" header="Data" body={DataBodyTemplate}></Column>
                    <Column field="valor_proc" header="Valor Procedimento" body={priceBodyTemplate} sortable></Column>
                </DataTable>
                 </S.RowColum>
                </S.ModalBody>
            </Modal>
            <div style={{position: "absolute", top: 300}}>
            <PuffLoader color="#085769" loading={loading}  size={150}/>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <S.IconLogoTittle src={logo}/>
            <div style={{display: "flex", flexDirection: "column"}}>
            <S.TittlePage>MÉDICOS CADASTRADOS</S.TittlePage>
            </div>
            </div>
            <div style={{marginTop: 85}}>
            <DataTable value={allDocs} paginator responsiveLayout="scroll"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={30} rowsPerPageOptions={[10,20,30]}
                     selectionMode="checkbox" dataKey="numrDfq" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}  selectionKeys={obgSelect} onSelectionChange={e => setObjSelect(e.value)}>
                    <Column field="name" header="Nome" style={{ width: '25%' }}></Column>
                    <Column field="email" header="E-mail" style={{ width: '25%' }}></Column>
                    <Column field="tell" header="Telefone" style={{ width: '25%' }}></Column>
                    <Column field="especialit" header="Especialidade" style={{ width: '25%' }}></Column>
                    <Column header="Editar" body={actionTemplateEdit()} style={{ textAlign: 'center', width: '10rem' }} />
                    <Column header="Visualizar Procedimentos" body={actionTemplateShow()} style={{ textAlign: 'center', width: '10rem' }} />
                </DataTable>
            </div>
            <Modal
                isOpen={modalEdit}
                onRequestClose={closeModalEdit}
                style={customStyles}
                contentLabel="Example Modal"
            >

            </Modal>
        </S.Body>
    )
}

export default AllDoctors;