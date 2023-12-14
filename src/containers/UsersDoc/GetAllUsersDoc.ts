export const GetAllUsersDoc:string = `
    <article id="GetAllUsers">
          <h3 class="titleEndpoint">GetAllUsers</h3>
          <ul>
            <li>METODO: <span class="green">GET</span>
            </li>
            <li>
              Endpoint: <strong>/users</strong>
            </li>
            <li>
              Variacoes:
        
              <ul>
                <li>
                <a href="/users">/users</a><strong> 200 ok WITHOUT SearchTerm</strong>: 
                <p>RETORNA LISTA COMPLETA de todos os usuaarios cadastrados que nao tenha o role de bands que consta de arquivo JSON com: 
                </p>
                <hr/>
                <h4><strong>Messsage:</strong>  "Resultado usuarios"</h4>
                
                <h4>Result:</h4>
                  <ul>
                    <li><strong>id:</strong> "id do usuario equivalente a cpf ou cnpj unico"</li>
                    <li><strong>name: </strong>"Nome completo do usuario"</li>
                    <li>
                        <strong>nickname:</strong> "nickname unico do usuario"
                    </li>
                    <li>
                      <strong>password:</strong> "senha do usuario com 8 a 12 caracteres 1 caracter especial 1 numero 1 letra maiuscula"
                    </li>
                      <li>
                        <strong>email: </strong> "email unico do usuario"
                      </li>
                      <li>
                      <strong>createdAt:</strong>"data de criacao que costusma ser em formato ISO STRING"
                    </li>
                    <li>
                      <strong>avatar: </strong> "avatar default ou selecionado por usuario a partir de link de url com imagem"
                    </li>
                    <li>
                      <strong>role:</strong> "Role do usuario"
                    </li>

                  
                 </ul>
                    <hr/>   
                </li>
        
        
                <li>
                <a href="/users?q=LAURA">/users?q=LAURA</a><strong> 200 ok WITH SEARCH TERM q</strong>
                </li>
<p>
                RETORNA LISTA DE USUARIOS com <strong>name que inclua searcTerm q </strong>  que retorna ums arquivo JSON com: </p>
           <hr/>
                <h4><strong>Messsage:</strong>  "Resultado usuarios"</h4>
                
                <h4>Result:</h4>
                  <ul>
                    <li><strong>id:</strong> "id do usuario equivalente a cpf ou cnpj unico"</li>
                    <li><strong>name: </strong>"Nome completo do usuario"</li>
                    <li>
                        <strong>nickname:</strong> "nickname unico do usuario"
                    </li>
                    <li>
                      <strong>password:</strong> "senha do usuario com 8 a 12 caracteres 1 caracter especial 1 numero 1 letra maiuscula"
                    </li>
                      <li>
                        <strong>email: </strong> "email unico do usuario"
                      </li>
                      <li>
                      <strong>createdAt:</strong>"data de criacao que costusma ser em formato ISO STRING"
                    </li>
                    <li>
                      <strong>avatar: </strong> "avatar default ou selecionado por usuario a partir de link de url com imagem"
                    </li>
                    <li>
                      <strong>role:</strong> "Role do usuario"

                      <hr/>
                    </li>
                  </ul>
                  </li>
                    <li>
                    <a href="/users?q=JOANILSON">/users?q=JOANILSON</a><strong> 404 NOT FOUND WITH SEARCH TERM q</strong>
                    </li>
    <p>Retorna somente mensagem 404 User NOT Found  </p>
               <hr/>
                    <h4><strong>Messsage:</strong>  "404: User not Found"</h4>
                    
                   
              


              </ul>
            <hr/>
            </li>
          </ul>
    </article>
`