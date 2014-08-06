define(['react'], function(React) {
  /**
   * <TimeMessage elapsed={100} />
   */
  var TimeMessage = React.createClass({
    render: function() {
      var elapsed = Math.round(this.props.elapsed  / 100);
      var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
      var message =
        'React has been successfully running for ' + seconds + ' seconds.';

      // JSX code
      return <p>{message}</p>;
    }
  });

  return TimeMessage;
});
