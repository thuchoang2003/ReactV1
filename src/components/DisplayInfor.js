import React from "react";
class DisplayInfor extends React.Component {
  state = {
    isShowList: true,
  };
  handleShowHide = (event) => {
    this.setState({
      isShowList: !this.state.isShowList,
    });
  };
  render() {
    console.log(this.props);
    const { listUsers } = this.props;
    return (
      <div>
        <div>
          <span
            onClick={(event) => {
              this.handleShowHide(event);
            }}
          >
            {this.state.isShowList ? "hide list user" : "show list user"}
          </span>
        </div>
        {this.state.isShowList && (
          <div>
            {listUsers.map((item) => {
              return (
                <div key={item.id} className={+item.age > 25 ? "green" : "red"}>
                  <div>MyName is {item.name}</div>
                  <div>Age is {item.age}</div>
                  <hr></hr>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default DisplayInfor;
