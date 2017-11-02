import React from 'react';
import Select from 'react-select';

class NewEvent extends React.Component {
  constructor(){
    super()

    this.state = {
      title: '',
      description: '',
      defaultPrompt: '',
      participants: []
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDefaultPromptChange = this.handleDefaultPromptChange.bind(this);
    this.handleParticipantsChange = this.handleParticipantsChange.bind(this);

  }

  handleTitleChange() {
    this.setState({title: event.target.value});
  }

  handleDescriptionChange(){
    this.setState({description: event.target.value});
  }

  handleDefaultPromptChange() {
    this.setState({defaultPrompt: event.target.value});
  }

  handleParticipantsChange() {
    this.setState({participants: [...this.state.participants, event.target.value]});

  }


  render(){
    return(

        <div className="w-100 mh4">

          <div className="tc">
            <h1 className="accent-orange f1-m f2 fw4">New Survey</h1>
          </div>

          <div className="pa4">
            <form onSubmit={this.handleSubmit}>

                <div className="mt3">
                  <label className="fw4 lh-copy f5">
                    Title
                    <input className="pa2 mh2 bg-transparent w-100 measure" type="text" name="title" value={this.state.title} onChange={this.handleTitleChange}/>
                  </label>

                </div>
                <div className="mt3">
                  <label className="fw4 lh-copy f5">
                    Description
                    <input className="pa2 mh2 bg-transparent w-100 measure" type="textarea" name="title" value={this.state.description} onChange={this.handleDescriptionChange}/>
                  </label>
                </div>
                <div className="mt3">
                  <label className="db fw4 lh-copy f5">
                    Default reflection prompt
                    <input className="pa2 mh2 bg-transparent w-100 measure" type="teaxtarea" name="defaultPrompt" value={this.state.defaultPrompt} onChange={this.handleDefaultPromptChange}/>
                  </label>
                </div>
                <div className="mt3">
                  <label className="db fw4 lh-copy f5">
                    Invite participants
                    <input className="pa2 mh2 bg-transparent" type="text" name="participants" value={this.state.participants} onChange={this.handleParticipantsChange}/>
                  </label>
                </div>
                <div className="tc mt3">
                  <button className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button br1 link grow pointer" type="submit" value="Submit">Sign up</button>
                </div>


            </form>
          </div>







      </div>
    )
  }
}

export default NewEvent;
