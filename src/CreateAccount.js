import keyring from '@polkadot/ui-keyring';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import React from 'react'
import { Button, Grid, Input } from 'semantic-ui-react'

export default function CreateAccount() {
  const [mnemonic, setMnemonic] = React.useState('');
  const [form, setForm] = React.useState({
    username: '',
    password: ''
  });

  async function genMnemonic() {
    setMnemonic(mnemonicGenerate(12));
  }

  async function createAcc () {
    // add the account, encrypt the stored JSON with an account-specific password
    const { pair, json } = keyring.addUri(
      mnemonic, 
      form.password, 
      { name: form.username }
    );
    console.log(pair, json);
  }
  console.log(form.username, form.password);

  return (
    <Grid.Column>
      <h2>Create Account</h2>
      { mnemonic &&
        <div>
          <Input 
            style={{
              marginBottom: '8px',
              display: 'block',
            }} 
            value={mnemonic} 
            readOnly
          />
          <Input 
            placeholder='Enter Username'
            style={{
              marginBottom: '8px', 
              display: 'block',
            }} 
            value={form.username}
            onChange={e => setForm({
              username: e.target.value,
              password: form.password
            })}
          />
          <Input 
            placeholder='Enter Password'
            style={{
              marginBottom: '8px', 
              display: 'block',
            }} 
            value={form.password}
            onChange={e => setForm({
              username: form.username,
              password: e.target.value
            })}
          />
        </div>
      }
      { mnemonic ?
        <Button onClick={createAcc}>Create Account</Button>
        :
        <Button onClick={genMnemonic}>Generate Mnemonic Seed</Button>
      }
    </Grid.Column>
  )
}
