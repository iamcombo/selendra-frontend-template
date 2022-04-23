import React from 'react'
import toast from 'react-hot-toast';
import keyring from '@polkadot/ui-keyring';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import { Button, Grid, Input } from 'semantic-ui-react'

export default function CreateAccount({ isMnemonic }) {
  const [mnemonic, setMnemonic] = React.useState('');
  const [form, setForm] = React.useState({
    username: '',
    password: ''
  });

  async function genMnemonic() {
    setMnemonic(mnemonicGenerate(12));
  }

  async function createAcc () {
    try {
      // add the account, encrypt the stored JSON with an account-specific password
      const { pair, json } = keyring.addUri(
        mnemonic, 
        form.password, 
        { name: form.username },
        'sr25519'
      );
      console.log(pair, json);

      const strJSON = JSON.stringify(json);
      const blob = new Blob([strJSON],{type:'application/json'});
      const href = await URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = "account.json";
      link.click();

      toast.success('Done!');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Grid.Column>
      <h2>{ isMnemonic ? 'Restore Account With Mnemonic' : 'Create Account'}</h2>
      <div>
        <Input 
          style={{
            marginBottom: '8px',
            display: 'block',
          }} 
          placeholder='Mnemonic'
          value={mnemonic} 
          onChange={e => setMnemonic(e.target.value)}
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
      { isMnemonic ?
        <Button onClick={createAcc}>Create Account</Button>
        :
        mnemonic ?
        <Button onClick={createAcc}>Create Account</Button>
        :
        <Button onClick={genMnemonic}>Generate Mnemonic Seed</Button>
      }
    </Grid.Column>
  )
}
