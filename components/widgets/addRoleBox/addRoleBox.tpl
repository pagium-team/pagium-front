<div id="addRoleBox" class="modal" style="top:35%;">
    <div class="modal-content">
        <form class="col s12 right-alert">
            <div class="row">
                <div class="input-field col s12">
                    <input id="rolename" type="text" v-model="name">
                    <label v-if="name" class="active" for="rolename">角色名</label>
                    <label v-else for="rolename">角色名</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input id="commom" type="text" v-model="commom">
                    <label v-if="commom" class="active" for="commom">描述</label>
                    <label v-else for="commom">描述</label>
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn waves-effect waves-light" style="margin-left: 10px;" type="button" name="action" v-on:click="confirm();">
        	确定<i class="mdi-content-save right"></i>
        </button>
        <button class="btn waves-effect waves-light" style="margin-left: 10px;" type="button" name="action" v-on:click="cancle();">
        	取消<i class="mdi-action-highlight-remove right"></i>
        </button>
    </div>
</div>