const { Plugin } = require('powercord/entities');
const { getModule, getModuleByDisplayName } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

const { getGuild } = getModule(['getGuild'], false);
const MemberListItem = getModuleByDisplayName('MemberListItem', false);

module.exports = class ForceOwnerCrown extends Plugin {
   startPlugin() {
      inject('force-owner-crown', MemberListItem.prototype, 'renderDecorators', function (args, res) {
         const owner = getGuild(this.props.channel?.guild_id)?.ownerId;
         if (owner == this.props.user?.id) this.props.isOwner = true;

         return args;
      }, true);
   }

   pluginWillUnload() {
      uninject('force-owner-crown');
   }
};