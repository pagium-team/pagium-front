<div id="addUserBox" class="modal" style="top:35%;">
    <div class="modal-content">
        <form class="col s12 right-alert">
            <div class="row">
                <div class="input-field col s12">
                    <input id="username" type="text" v-model="username">
                    <label v-if="username" class="active" for="username">用户名</label>
                    <label v-else for="username">用户名</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input id="password1" type="password" v-model="password1">
                    <label for="password1">密码</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input id="password2" type="password" v-model="password2">
                    <label for="password2">密码确认</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <select id="role" multiple v-bind:change="rolesChange">
                        <option value="" disabled selected>选择用户角色</option>
                        <option v-for="role in roleList" value="{{ role.id }}">{{ role.name }}</option>
                    </select>
                    <label for="role">所属角色</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input id="remark" type="text" v-model="remark">
                    <label v-if="remark" class="active" for="remark">描述</label>
                    <label v-else for="remark">描述</label>
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