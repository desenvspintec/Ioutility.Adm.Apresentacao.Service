import { ValidationErrors } from '@angular/forms';
import { CnValidationErro } from './../cn-components/control-value-accessor/validations/i-cn-validation-erro';
import { CN_VALIDATIONS } from './../cn-components/control-value-accessor/validations/cn-validations';
import { IDisplayNameItem } from './../models/display-name-item';
import { CnSessaoGrupoCamposDetalhe } from './../cn-components/cn-detalhes/models/cn-sessao-grupo-campos-detalhe';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MIN_LENGTH_PADRAO } from 'src/app/shared/constants/string-length-padrao.constant';

import { CnInputCvaModel } from '../cn-components/control-value-accessor/models/cn-input-cva.model';
import { CnCampoDetalhe } from '../cn-components/model/cn-campo-detalhe';
import { CnGrupoCamposFormulario } from '../cn-components/model/cn-grupo-campos-formulario';
import { CnStepperFormItemModel } from '../cn-components/model/cn-stepper-form-item.model';
import { CnStepperFormModel } from '../cn-components/model/cn-stepper-form.model';
import { TAMANHO_UNICO_12 } from '../constants/css-class-tamanhos';
import { MAX_LENGTH_PADRAO } from '../constants/string-length-padrao.constant';
import { CnBaseDetalheModel } from '../cn-components/cn-detalhes/models/cn-detalhe-model';
import { CONTROL_NAME_ID, FORM_TITULO_GENERICO, CONTROL_NAME_NOME, TELEFONE_CELULAR_MASK, TELEFONE_RESIDENCIAL_MASK, NAME_STEPPER_UNICO, CPF_MASK, CNPJ_MASK } from './../constants/forms-contante';
import { ICrudService } from './../interfaces/i-crud-service';
import { CnGrupoCampoDetalhe } from '../cn-components/cn-detalhes/models/cn-grupo-campos-detalhe';

export const NOME_SESSAO_DETALHES_UNICA = '';
export class CnFormHelper {

  static obterTodosInputsCvasEDependentes(inputsCvasNoFormulario: CnInputCvaModel[]) {
    const inputsCvasDeSubFormularios = inputsCvasNoFormulario.filter(input => input.subformularios ).flatMap(input => input.subformularios!.grupoCampos.flatMap(grupo => grupo.campos));
    const inputsCvasDeSubFormulario = inputsCvasNoFormulario.filter(input => input.subformulario ).flatMap(input => input.subformulario!.grupoCampos.flatMap(grupo => grupo.campos));
    const inputsCvasDeValueObjects = inputsCvasNoFormulario.filter(input => input.ehValueObjectPersonalizado ).flatMap(input => input.controlsValueObjectPersonalizado!);
    return inputsCvasNoFormulario.concat(inputsCvasDeSubFormularios, inputsCvasDeSubFormulario, inputsCvasDeValueObjects)
  }

  static obterCampoId(): CnInputCvaModel {
    let model = CnInputCvaModel.obterHiddenGuid(CONTROL_NAME_ID);
    return model;
  }

  static obterCampoNome(maxLength = MAX_LENGTH_PADRAO, minLength = MIN_LENGTH_PADRAO): CnInputCvaModel {
    let model = CnInputCvaModel.obterTextoSimples(CONTROL_NAME_NOME, 'Nome', true, maxLength, minLength);
    return model;
  }
  static obterCampoNomeCompleto(maxLength = MAX_LENGTH_PADRAO, minLength = MIN_LENGTH_PADRAO): CnInputCvaModel {
    let model = CnInputCvaModel.obterTextoSimples(CONTROL_NAME_NOME, 'Nome Completo', true, maxLength, minLength);
    return model;
  }

  static obterCampoSenha(maxLength = MAX_LENGTH_PADRAO, minLength = MIN_LENGTH_PADRAO): CnInputCvaModel {
    let model = CnInputCvaModel.obterTextoSimples('senha', 'Senha', true, maxLength, minLength);
    return model;
  }

  static obterStpperFormularioComIdENome(maxLength = MAX_LENGTH_PADRAO, minLength = MIN_LENGTH_PADRAO): CnStepperFormModel {
    const campos = [
      this.obterCampoId(),
      this.obterCampoNome(maxLength, minLength).setarClassTamanho(TAMANHO_UNICO_12)
    ];

    const model = new CnStepperFormModel([new CnStepperFormItemModel(NAME_STEPPER_UNICO, FORM_TITULO_GENERICO, [new CnGrupoCamposFormulario(FORM_TITULO_GENERICO, campos)] )])

    return model;
  }

  static obterDetalhesModelIdENome(service: ICrudService): CnBaseDetalheModel {
    const sessaoUnica = [new CnSessaoGrupoCamposDetalhe(NOME_SESSAO_DETALHES_UNICA, [new CnGrupoCampoDetalhe(FORM_TITULO_GENERICO, false, [new CnCampoDetalhe(CONTROL_NAME_NOME, 'Nome')] )])];
    const model =  new CnBaseDetalheModel(service.buscarPorId, [new CnCampoDetalhe(CONTROL_NAME_ID, 'ID')], sessaoUnica);
    return model;
  }
  static notificarSucessoToastr(toastrService: ToastrService): void {
    toastrService.success('Operação realizada com sucesso!', 'Tudo certo!', { progressBar: true});
  }
  static notificarErroToastr(toastrService: ToastrService): void {
    toastrService.error('Não foi possivel realizar a operação', ': (', { progressBar: true});
  }
  static obterCampoCpf(displayName: IDisplayNameItem): CnInputCvaModel {
    return CnInputCvaModel.obterTextoSimplesComMask(
      displayName.cpf.nomePropriedade,
      displayName.cpf.valorDisplay,
      true,
      CPF_MASK
    ).setarValidacoesPersonalizada([
      CN_VALIDATIONS.documentos.cpf
    ]);
  }
  static obterCampoEmail(displayName: IDisplayNameItem, required = true): CnInputCvaModel {
    return CnInputCvaModel.obterEmail(
      displayName.email.nomePropriedade,
      displayName.email.valorDisplay,
      required,
    );
  }
  static obterCampoCnpj(displayName: IDisplayNameItem): CnInputCvaModel {
    return CnInputCvaModel.obterTextoSimplesComMask(
      displayName.cnpj.nomePropriedade,
      displayName.cnpj.valorDisplay,
      true,
      CNPJ_MASK
    ).setarValidacoesPersonalizada([
      CN_VALIDATIONS.documentos.cnpj
    ]);
  }
  static obterErroValidacao(validationErro: CnValidationErro): ValidationErrors {
    let erro = {} as ValidationErrors;
    erro[validationErro.erro] = true;
    return erro;
  }

  static validacaoTelefoneDelegate(inputModel: CnInputCvaModel): (form: FormGroup) => void {
    return (form: FormGroup) => {
      form.get(inputModel.name)?.valueChanges.subscribe({
        next: (valor) => {
          if (valor) {
            const valorString = valor as string;
            if (valorString.length > 3) {
              const terceiroCaracter = valorString[2];
              const ehCelular = terceiroCaracter === '9';
              if (ehCelular)
                inputModel.mask = TELEFONE_CELULAR_MASK;
              else
                inputModel.mask = TELEFONE_RESIDENCIAL_MASK;

            }
          }
        }
      })
    };
  }
}
