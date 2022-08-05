import React from "react";
import styled from "styled-components";
import trash from "../src/Trash.png";

export const Box = styled.div`
  background-image: linear-gradient(180deg, #00e6e6, #003080);
  padding: 2em;
  height: 40em;
  border-radius: 1em;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  max-width: 1000px;
  margin: 0 auto;
  height: 22em;
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
  justify-content: center;
  h1 {
    text-decoration: underline overline;
    font-size: 2.5rem;
    text-align: center;
  }
  input {
    width: 15em;
  }
  button {
    font-size: 1rem;
    margin-top: 5px;
    border-radius: 2em;
    width: 10em;
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
  justify-content: space-between;
  flex-wrap: wrap;
  width: 200px;
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

  handleChange = (event) => {
    this.setState({
      task: event.target.value
    });
  };

  addTask = () => {
    if (this.state.task !== "" && !this.state.task.match(/^[  \t]+$/)) {
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

  cleanTasks = () => {
    this.setState({
      taskList: this.state.taskList.filter((item) => {
        return item.id === "";
      }),
      task: ""
    });
  };

  handleKeyPress = (event) => {
    if (
      event.key === "Enter" &&
      !this.state.task.match(/^[  \t]+$/) &&
      this.state.task !== ""
    ) {
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
              onChange={this.handleChange}
              value={this.state.task}
            />
            <button onClick={this.addTask}>Adicionar</button>
            <button onClick={this.cleanTasks}>Limpar Lista</button>
          </TextList>
          {this.state.taskList.map((item) => (
            <Task key={item.id}>
              <p>{item.task}</p>
              <button onClick={() => this.delTask(item.id)}>
                <Img src={trash} />
              </button>
            </Task>
          ))}
        </List>
      </Box>
    );
  }
}
