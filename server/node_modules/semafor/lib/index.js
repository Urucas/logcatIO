import colors from 'colors';
export default function semafor() {
  return {
    fail: function(msg) {
      console.log("✗ ".red + msg)
    },
    ok : function(msg) {
      console.log("✓ ".green + msg)
    },
    warn: function(msg) {
      console.log("! ".yellow + msg)
    },
    log: function(msg) {
      console.log(msg)
    }
  }
}
