import React, { Component } from 'react';
import {
  Grid,
  Form,
  Input,
  Segment,
} from 'semantic-ui-react'
import './App.css';
import numeral from 'numeral';

const WORKING_DAYS_A_YEAR = 260;
const DEFAULT_A_DAY = 300;
const DEFAULT_HOLIDAYS = 20;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      aDay: DEFAULT_A_DAY,
      holidays: DEFAULT_HOLIDAYS,
      neededADay: this.calcTotal(DEFAULT_A_DAY, DEFAULT_HOLIDAYS)
    };

    this.updateAmount = this.updateAmount.bind(this);
    this.updateHolidays = this.updateHolidays.bind(this);
  }

  updateAmount(e) {
    let val = e.target.value;

    this.setState({
      aDay: val,
      neededADay: this.calcTotal(val, this.state.holidays)
    });

  }

  updateHolidays(e) {
    let val = e.target.value;

    this.setState({
      holidays: val,
      neededADay: this.calcTotal(this.state.aDay, val)
    });
  }

  calcTotal(aDay, holidays) {
    let neededADay = (WORKING_DAYS_A_YEAR - holidays) * aDay;
    return neededADay;
  }

  render() {
    const {
      aDay,
      neededADay,
      holidays,
    } = this.state;

    return (
      <div style={{marginTop: "2rem"}}>
        <Grid centered stackable columns={12}>
          <Grid.Row>
            <Grid.Column
              width={6}
              textAlign="center"
            >
              <Segment piled>
                <h1>How much <i>a-day</i> do you need to make to make it</h1>
                <Form>
                  <Form.Field>
                    <label>Monies per day</label>
                    <Input
                      value={aDay}
                      onChange={this.updateAmount}
                      placeholder="Enter price for day"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Days off a year</label>
                    <Input
                      value={holidays}
                      onChange={this.updateHolidays}
                      placeholder="Enter price for day"
                    />
                  </Form.Field>
                </Form>
                <hr />
                <div className="center">
                  {aDay}  pre day
                </div>
                <div className="center">
                  &times;
                </div>
                <div className="center">
                  260 (working days) - {holidays} Holiday days
                </div>
                <h3>
                  {numeral(neededADay).format('$0,0.00')}/year
                </h3>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
