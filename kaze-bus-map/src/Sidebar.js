import React, { Component } from 'react';
import "./Sidebar.css";

class Sidebar extends Component {
    constructor(props){
        super(props);
        this.collapseSidebar = this.collapseSidebar.bind(this);
        this.uncollapseSidebar= this.uncollapseSidebar.bind(this);
        this.state = {display:true};
    }

    collapseSidebar(){
        this.setState({display:false});
    }

    uncollapseSidebar(){
        this.setState({display:true});
    }

    render() {
        let displaySidebar;
        let height = this.props.height-80;
        let heightStyle = {height: height+"px"};
        let collapseButtonStyle = {
            top: height /2 - 15 +"px"
        }
        let collapseButton
        if(this.state.display) {
            collapseButton = <div className="collapseButton" style={collapseButtonStyle} onClick={this.collapseSidebar}>
                                <i className="fa fa-caret-right"></i>
                             </div>
        }else{
            collapseButton = <div className="collapseButton-close" style={collapseButtonStyle} onClick={this.uncollapseSidebar}>
                                <i className="fa fa-caret-right"></i>
                             </div>
        }
       

        let SidebarClass = "";
        if(this.state.display){
            SidebarClass = "Sidebar";
        }else{
            SidebarClass = "Sidebar Sidebar-close";
        }


        return (
        <div className={SidebarClass} style={heightStyle}>
            {collapseButton}
        </div>
        );
    }
}
export default Sidebar;