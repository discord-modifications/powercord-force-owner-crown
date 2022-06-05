const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

const { getGuild } = getModule(['getGuild'], false);
const Item = getModule(['AVATAR_DECORATION_PADDING'], false)?.default;

module.exports = class ForceOwnerCrown extends Plugin {
   startPlugin() {
      if (!Item) return;

      inject('force-owner-crown-wrapper', Item, 'type', function (_, res) {
         inject('force-owner-crown', res.type.prototype, 'renderDecorators', function (args, res) {
            const owner = getGuild(this.props.channel?.guild_id)?.ownerId;
            if (owner == this.props.user?.id) this.props.isOwner = true;

            return args;
         }, true);

         uninject('force-owner-crown-wrapper');
         return res;
      });
   }

   pluginWillUnload() {
      uninject('force-owner-crown-wrapper');
      uninject('force-owner-crown');
   }
};
