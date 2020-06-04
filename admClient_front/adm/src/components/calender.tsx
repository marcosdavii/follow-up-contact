import React, { Component } from 'react';
import { ScheduleComponent, Day, Week, Month, Inject } from '@syncfusion/ej2-react-schedule';
import { L10n } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';

L10n.load({
    'pt-BR': {
        'saveButton': 'Adicionar',
        'cancelButton': 'Fechar',
        'deleteButton': 'Excluir',
        'newEvent': 'Novo Evento',
    }
})
export default class Calender extends Component {


localData = [
        {
            Id: 1,
            Subject: '',
            StartTime: new Date(),
            EndTime: new Date()
        }
    ]
 
  public editorWindowTemplate(props: any): JSX.Element {
        return (
            <table className="custom-event-editor" style={{ width: '100%' }}>
                <tbody>
                    <tr>
                        <td className="e-textlabel">Cliente</td>
                        <td><input 
                        id="Summary" 
                        name="Subject" 
                        className="e-field e-input" 
                        style={{ width: '100%' }} 
                        type="text"/></td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Status</td>
                        <td></td>
                        <DropDownListComponent id="EventType"
                            dataSource={['Novo', 'Não Confirmado', 'Confirmado']}
                            className="e-field "
                            placeholder='Escolha um status'
                            data-name="EventType" 
                            style={{ width: '100% ' }}
                            value={props.EventType || null} >
                        </DropDownListComponent>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Inicio</td>
                        <td>
                            <DateTimePickerComponent 
                                id="StartTime"
                                data-name="StartTime"
                                value={new Date(props.startTime || props.StartTime)}
                                className="e-field"
                                format='dd/MM/yy hh:mm a'>
                            </DateTimePickerComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Fim</td>
                        <td>
                            <DateTimePickerComponent 
                                id="EndTime"
                                data-name="EndTime"
                                className="e-field"
                                value={new Date(props.endTime || props.EndTime)}
                                format='dd/MM/yy hh:mm a'>
                            </DateTimePickerComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-textlabel">Descrição</td>
                        <td>
                            <textarea id="Description"
                                name="Description"
                                rows={3}
                                cols={50}
                                className="e-field"
                                style={{ width: '100%', height: '60px !important', resize: 'vertical' }} ></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>)
    }

    render() {
        return (
            <div className='schedule-control-section'>
            <div className='col-lg-16 control-section'>
              <div className='control-wrapper'>
            <ScheduleComponent height='550px' currentView='Week' 
                eventSettings={{ dataSource: this.localData }}
                views={['Day', 'Week', 'Month']}
                editorTemplate={this.editorWindowTemplate.bind(this)} >
                <Inject services={[Day, Week, Month ]} />
            </ScheduleComponent> 
              </div>
            </div>
          </div>
        );
    }

}