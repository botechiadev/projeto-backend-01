import { GetAllUsersDoc } from "./GetAllUsersDoc";
import { GetUserByIdDoc } from "./GetUsersByIdDoc";

export const UsersDoc:string = `
<section  id="usersDoc">
    <h2 class="titleSection">Users ApiDoc</h2>
      <ul>
        <li><a href="#GetAllUsersDoc">GetAllUsers</a></li>
        <li><a href="#GetUsersByIdDoc">GetUsersById</a></li>

      </ul>

${GetAllUsersDoc}
${GetUserByIdDoc}


</section>
`

