import React from "react";
import styled from "styled-components";

export const Box = styled.div`
  background-image: linear-gradient(180deg, #00e6e6, #003080);
  padding: 2em;
  height: 20em;
  border-radius: 1em;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 15em;
  overflow: scroll;
  border-radius: 1em;
  align-items: center;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const TextList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 50em;
  h1 {
    text-decoration: underline overline;
  }
  input {
    width: 10em;
  }
  button {
    width: 5em;
    border: none;
    cursor: pointer;
    transition: 0.5s all;
  }
  button:hover {
    background-color: skyblue;
  }
`;

export const Task = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  display: flex;
  margin-top: 1em;
  border-bottom: 1px solid gray;
  button {
    border: none;
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin: 1.5em 1em;
  }
`;

export const Img = styled.img`
  width: 10px;
  height: 10px;
`;

export default class ToDo extends React.Component {
  state = {
    task: "",
    taskList: []
  };

  HandleChange = (event) => {
    this.setState({
      task: event.target.value
    });
  };

  addTask = () => {
    //this.state.task.length > 0 também funciona
    //Lembrar de não adicionar com SPACE BAR  e ficar um elemento vazio
    if (this.state.task !== "") {
      this.setState({
        taskList: this.state.taskList.concat({
          task: this.state.task,
          id: Date.now()
        }),
        task: ""
      });
    }
  };

  delTask = (id) => {
    this.setState({
      taskList: this.state.taskList.filter((item) => {
        return item.id !== id;
      })
    });
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter" && this.state.task !== "") {
      this.setState({
        taskList: this.state.taskList.concat({
          task: this.state.task,
          id: Date.now()
        }),
        task: ""
      });
    }
  };

  render() {
    return (
      <Box>
        <List>
          <TextList>
            <h1>Lista de tarefas</h1>
            <input
              onKeyPress={this.handleKeyPress}
              onChange={this.HandleChange}
              value={this.state.task}
            />
            <button onClick={this.addTask}>Adicionar</button>
          </TextList>
          {this.state.taskList.map((item) => (
            <Task key={item.id}>
              <p>{item.task}</p>
              <button onClick={() => this.delTask(item.id)}>
                <Img src="https://cdn-icons.flaticon.com/png/128/542/premium/542724.png?token=exp=1659671278~hmac=cc4393584cd48b406270301ba66faa59" />
              </button>
            </Task>
          ))}
        </List>
      </Box>
    );
  }
}
