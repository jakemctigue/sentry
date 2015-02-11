/*** @jsx React.DOM */

var React = require("react");

var PropTypes = require("../../proptypes");
var utils = require("../../utils");

var GroupEventToolbar  = React.createClass({
  propTypes: {
    orgId: React.PropTypes.string.isRequired,
    projectId: React.PropTypes.string.isRequired,
    group: PropTypes.Group.isRequired,
    event: PropTypes.Event.isRequired,
  },

  render() {
    var orgId = this.props.orgId;
    var projectId = this.props.projectId;
    var groupId = this.props.group.id;
    var evt = this.props.event;

    var eventNavNodes = [
      (evt.nextEventID ?
        <Router.Link
            key="next"
            to="groupEventDetails"
            params={{orgId: orgId,
                     projectId: projectId,
                     groupId: groupId,
                     eventId: evt.nextEventID}}
            className="btn btn-default btn-lg">Newer</Router.Link>
      :
        <a key="next"
           className="btn btn-default btn-lg disabled">Newer</a>
      ),
      (evt.previousEventID ?
        <Router.Link
            key="prev"
            to="groupEventDetails"
            params={{orgId: orgId,
                     projectId: projectId,
                     groupId: groupId,
                     eventId: evt.previousEventID}}
            className="btn btn-default btn-lg">Older</Router.Link>
      :
        <a key="prev"
           className="btn btn-default btn-lg disabled">Older</a>
      ),
    ];

    var entryLinks = evt.entries.map(function(entry){
      return (
        <li>
          <a href={"#" + entry.type}>{utils.toTitleCase(entry.type)}</a>
        </li>
      );
    });

    return (
      <div className="event-toolbar">
        <div className="pull-right">
          <div className="btn-group">
            {eventNavNodes}
          </div>
        </div>
        <ul className="nav nav-tabs">
          <li className="active"><a href="#tags">Tags</a></li>
          {entryLinks}
        </ul>
      </div>
    );
  }
});

module.exports = GroupEventToolbar ;