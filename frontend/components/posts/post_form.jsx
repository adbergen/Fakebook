import React from 'react';

class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          body: '',
          receiverId: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    update(body) {
        return e => this.setState({
          [body]: e.target.value
        });
    }

    render() {
    return (
        <div>
            <h1>This is the psot form</h1>
            <form onSubmit={this.handleSubmit}>
            <textarea name="" id="" cols="30" rows="10" onChange={this.update('body')}></textarea>
            <input type="submit" value="Post" />
            </form>
        </div>
        )
    }
}

export default PostForm;