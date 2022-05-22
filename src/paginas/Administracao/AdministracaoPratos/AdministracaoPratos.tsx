import {
    Box,
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import { Link as RouterLink } from "react-router-dom";
  import http from "../../../http";
  import IPrato from "../../../interfaces/IPrato";
  
  const AdministracaoPratos = () => {
    const [pratos, setPratos] = useState<IPrato[]>([]);
  
    useEffect(() => {
      http
        .get<IPrato[]>("pratos/")
        .then((resposta) => setPratos(resposta.data));
    }, []);
  
    const excluir = (pratoASerExcluido: IPrato) => {
      http.delete(`pratos/${pratoASerExcluido.id}/`).then(() => {
        const listaPrato = pratos.filter(
          (prato) => prato.id !== pratoASerExcluido.id
        );
        setPratos([...listaPrato]);
      });
    };
    return (
      <>
  
        <Box>
          <Container maxWidth="lg" sx={{ mt: 1 }}>
            <Paper sx={{ p: 2 }}>
              {/*  Conteudo da página   */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Tag</TableCell>
                        <TableCell>Imagem</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Excluir</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pratos.map((prato) => (
                        <TableRow key={prato.id}>
                          <TableCell>{prato.nome}</TableCell>
                          <TableCell>{prato.tag}</TableCell>
                          <TableCell><a href={prato.imagem} target='blank' rel="noreferrer"> [Ver Imagem]</a></TableCell>
                          <TableCell>
                            [{" "}
                            <RouterLink
                              to={`/admin/pratos/${prato.id}`}
                            >
                              Editar
                            </RouterLink>{" "}
                            ]
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => excluir(prato)}
                            >
                              Excluir
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Paper>
          </Container>
        </Box>
      </>
    );
  };
  
  export default AdministracaoPratos;
  