<div id="chart-dashboard" class="projectList-page">
	<div id="input-select" class="pl-addProject-btn-panel">
		<a href="javascript:void(0)" class="btn waves-effect waves-light pink tooltipped" data-position="right" data-delay="50" data-tooltip="添加用户" v-on:click="addRole();"><i class="mdi-content-add"></i></a>
	    <!--<button class="btn waves-effect waves-light" style="margin-left: 10px;" type="button" name="action" v-on:click="addProject();">添加项目-->
	        <!--<i class="mdi-av-my-library-add left"></i>-->
	    <!--</button>-->
	</div>

    <div class="card-panel">
        <table>
            <thead>
                <tr>
                    <th data-field="id">角色ID</th>
                    <th data-field="username">角色名</th>
                    <th data-field="status">状态</th>
                    <th data-field="remark">描述</th>
                    <th data-field="operate">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="role in roleList">
                    <td>{{ role.id }}</td>
                    <td>{{ role.name }}</td>
                    <td>{{ role.status }}</td>
                    <td>{{ role.remark }}</td>
                    <td>
                    	<!--<a class="btn-floating red btn-small tooltipped" data-position="left" data-delay="500" data-tooltip="编辑" v-on:click="openEditDialog($index)"><i class="mdi-action-view-headline"></i></a>-->
                    	<a class="btn-floating red btn-small tooltipped" data-position="right" data-delay="500" data-tooltip="删除" v-on:click="delRole($index)"><i class="mdi-action-delete"></i></a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</div>
